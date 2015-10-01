(function()
{
    $(init);

    function init()
    {
        // click event handler
        // functions can be declared inline
        $("#clickBtn").click(function(){alert("Hello!");});

        // double click event handler
        $("#doubleClkBtn").dblclick(function()
        {
            var message = $("#doubleMessage").val();
            alert(message);
        });

        // hover
        // functions can be passed as arguments
        $("#hoverEvent").hover(hoverEnter, hoverLeave);

        // DOM elements can be assigned to local variables
        var hoverMessageFld = $("#hoverMessage");

        function hoverEnter(enterEvent)
        {
            console.log(enterEvent);
            var message = hoverMessageFld.val();
            alert("Enter: " + message);
        }

        function hoverLeave(leaveEvent)
        {
            console.log(leaveEvent);
            var message = hoverMessageFld.val();
            alert("Leave: " + message);
        }
    }
})();
