
function Content() {}

Content.prototype = {
    constructor: Content,

    init: function() {
        if (!this.isMongo()) {
            return;
        }
        this.getElements();
        this.registerListeners();
    },

    getElements: function() {
        Array.from(document.querySelectorAll('span[role="presentation"]'))
            .filter(this.isRefElement)
            .forEach(this.makeLink);
    },

    registerListeners: function() {
        var context = this;
        document.addEventListener('click', function(event) {
            var classList = event.target.classList;
            if (classList !== undefined && classList !== null 
                && classList.contains('cm-string') && classList.contains('reference')) {
                    //context.copyToClipboard(event.target.innerHTML);
                    context.sendToBackgorundScript(event.target.innerHTML);
            }
        });
    },

    isMongo: function() {
        var titleContainer = document.getElementsByClassName('navbar-brand');
        return titleContainer !== undefined
            && titleContainer[0] !== undefined 
            && titleContainer[0].innerHTML !== undefined 
            && titleContainer[0].innerHTML === 'Mongo Express'
    },

    isRefElement: function(element) {
        var propertyChild = element.querySelector('span.cm-variable');
        return propertyChild !== undefined && propertyChild !== null
            && propertyChild.innerHTML !== undefined && propertyChild.innerHTML !== null
            && propertyChild.innerHTML === 'ObjectId';
    },

    makeLink: function(element) {
        var tmp = element.getElementsByClassName('cm-string');
        if (tmp === undefined || tmp === null) {
            return;
        }
        var link = tmp[0];
        if (link === undefined || link === null) {
            return;
        }
        link.classList.add('reference');
    },

    copyToClipboard: function(text) {
        const tempElement = document.createElement("textarea");
        tempElement.value = text;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand("copy");
        document.body.removeChild(tempElement);
    },

    sendToBackgorundScript(text) {
        var resourceId = text.replace(/[^0-9A-Fa-f]/g, "");
        chrome.storage.sync.set({ resourceId: resourceId });
    }
};

var content = new Content();
content.init();