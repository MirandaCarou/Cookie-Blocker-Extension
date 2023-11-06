class SetUp{
    constructor(){
        this.handlers = [new Didomi(), new OneTrust(), new CookieYes(), new CookieNotice(), new Osano()];
        this.rootNames = [];
    }

    getAllHandlers(){
        return this.handlers;
    }

    getAllRootNames(){
        this.handlers.forEach(element => {
            this.rootNames.push(element.getRootName());
        });
        return this.rootNames;
    }

    
}