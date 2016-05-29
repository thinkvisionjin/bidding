
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="keywords" content="jQuery Tree, Tree Widget, TreeView" />
    <meta name="description" content="The jqxTree can easily display images next to each item. In order to achieve that, you need to add 'img' element inside a 'li' element." />
    <title id='Description'>The jqxTree in this demo displays images next to the tree items.
    </title>
    <link rel="stylesheet" href="../../jqwidgets/styles/jqx.base.css" type="text/css" />
    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxbuttons.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxscrollbar.js"></script>
    <script type="text/javascript" src="/bidding/static/js/vendor/jqwidgets/jqxpanel.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxtree.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqxexpander.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            // Create jqxExpander
            $('#jqxExpander').jqxExpander({ showArrow: false, toggleMode: 'none', width: '300px', height: '370px'});
            // Create jqxTree
            var source = [
            {
                icon: "../../images/mailIcon.png", label: "Mail", expanded: true, items: [
                  { icon: "../../images/calendarIcon.png", label: "Calendar" },
                  { icon: "../../images/contactsIcon.png", label: "Contacts", selected: true }
                ]
            },
            {
                icon: "../../images/folder.png", label: "Inbox", expanded: true, items: [
                 { icon: "../../images/folder.png", label: "Admin" },
                 { icon: "../../images/folder.png", label: "Corporate" },
                 { icon: "../../images/folder.png", label: "Finance" },
                 { icon: "../../images/folder.png", label: "Other" },
                ]
            },
            { icon: "../../images/recycle.png", label: "Deleted Items" },
            { icon: "../../images/notesIcon.png", label: "Notes" },
            { iconsize: 14, icon: "../../images/settings.png", label: "Settings" },
            { icon: "../../images/favorites.png", label: "Favorites" }
            ];
            $('#jqxTree').jqxTree({ source: source, width: '100%', height: '100%'});
            $('#jqxTree').jqxTree('selectItem', null);
        });
    </script>
</head>
<body class='default'>
    <div id='jqxWidget'>
        <div id='jqxExpander'>
            <div>
                Folders
            </div>
            <div style="overflow: hidden;">
                <div style="border: none;" id='jqxTree'>
                </div>
            </div>
        </div>
    </div>
</body>
</html>