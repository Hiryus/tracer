/*
    WARRNING: this script does NOT work with windows shell because of the `|| true`
    syntax required to prevent cp.exec() from throwing an error.

    If you need to run it under Windows, you need to use a Cygwin terminal (like git bash).
*/

const cp = require('child_process');
const fs = require('fs');
const path = require('path');

try {
    // Read package.json
    const packagejson = path.join(__dirname, '..', 'package.json');
    const packages = JSON.parse(fs.readFileSync(packagejson, 'utf8'));

    // Read each package status using `npm outdated` CLI`
    // (ignoring errors as `npm outdated` returns 1 if packages are not up to date)
    const stdout = cp.execSync('npm outdated --json --long || true');
    if (stdout.length === 0) {
        console.log('All dependencies are up to date.');
        process.exit(0);
    }
    const outdated = JSON.parse(stdout);

    // For each dependency, update packages list
    for (const [module, status] of Object.entries(outdated)) {
        if (status.current !== status.latest) {
            console.log(`Bumping ${module} version from ${status.current} to ${status.latest}`);
            packages[status.type][module] = status.latest;
        }
    }

    // Save changes in packages.json
    fs.writeFileSync(packagejson, JSON.stringify(packages, null, 2), 'utf8');
    process.exit(0);
} catch (err) {
    console.error(err);
    process.exit(1);
}
