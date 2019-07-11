$workspace = pwd;
cd $workspace;
cd "../"
$root_dir = pwd;
$src_dir = -Join($root_dir, "/SourceCode")
echo $src_dir
cd $src_dir
$install_dir = $root + "/SourceCode/node_modules";
if (TEST-PATH $install_dir){
    npm run serve
}
else{
    npm install;
    npm run serve;
}
pause;