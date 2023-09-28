class SetUp{
    constructor(){
        this.handlers = [new Didomi(), new OneTrust()];
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