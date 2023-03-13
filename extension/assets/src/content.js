
function Content() {
    //TODO rethink how in future this can be added using settings (after moving all services into background scripts)
    this.objectId = 'ObjectId';
    this.otherReferenceAttrs = [
        'resource', 'resourceId', 'formId', 'submissionId', 'createFormId',
        'updateFormId', 'rowDetailFormId', 'defaultViewId'
    ];
}

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
        var context = this;
        Array.from(document.querySelectorAll('span[role="presentation"]'))
            .filter(function(elem) { return context.isRefElement(elem, context); })
            .forEach(this.makeLink);
    },

    registerListeners: function() {
        var context = this;
        document.addEventListener('click', function(event) {
            var classList = event.target.classList;
            if (classList !== undefined && classList !== null 
                && classList.contains('cm-string') && classList.contains('reference')) {
                    context.sendToSyncStorage(event.target.innerHTML);
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

    isRefElement: function(element, context) {

        var objectIdElem = element.querySelector('span.cm-variable');
        var isObjectId = objectIdElem !== undefined && objectIdElem !== null
            && objectIdElem.innerHTML !== undefined && objectIdElem.innerHTML !== null
            && objectIdElem.innerHTML === context.objectId;

        if (isObjectId) {
            return true;
        }

        var otherReferenceElem = element.querySelector('span.cm-property');
        if (otherReferenceElem !== undefined && otherReferenceElem !== null 
            && otherReferenceElem.innerHTML !== undefined && otherReferenceElem.innerHTML !== null) {
                if (!context.otherReferenceAttrs.includes(otherReferenceElem.innerHTML)) {
                    return false;
                }
                var otherReferenceElemContent = element.querySelector('span.cm-string');
                return otherReferenceElemContent !== undefined && otherReferenceElemContent !== null 
                    && otherReferenceElemContent.innerHTML !== undefined && otherReferenceElemContent !== null 
                    && /'(?:[0-9a-fA-F])+'/g.test(otherReferenceElemContent.innerHTML);
        }

        return false;
    },

    isReferenceNotInjectedReferencedContent: function(referenceContent) {

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

    // copyToClipboard: function(text) {
    //     const tempElement = document.createElement("textarea");
    //     tempElement.value = text;
    //     document.body.appendChild(tempElement);
    //     tempElement.select();
    //     document.execCommand("copy");
    //     document.body.removeChild(tempElement);
    // },

    sendToSyncStorage(text) {
        var resourceId = text.replace(/[^0-9A-Fa-f]/g, "");
        chrome.storage.sync.set({ resourceId: resourceId });
    }
};

var content = new Content();
content.init();