$workspace = pwd;
cd $workspace;
cd "../"
$root_dir = pwd;
$delete_dir = -Join($root_dir, "/*")
rm -r $delete_dir;
echo "Delete complete.";
pause;