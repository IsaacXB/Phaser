class engine {
    constructor(name, scene) {
        this.name = name;
        this.scene = scene;
        this.componentes = new Map();
        this.activeComponents = [];
    }

    getScene(){
        return this.scene;
    }
    getName(){
        return this.name;
    }
    addComponent(newComponent, autoEnabled = true){
        if (newComponent == undefined)
        {
            console.error("Error: el componente debe estar definido.");
        }
        this.componentes.set(newComponent.constructor.name, newComponent );

        if (autoEnabled){
            this.enableComponent(newComponent);
        }
    }

    getComponent(componentName){
        if (componentName == undefined){
            console.error("Error: el componente debe estar definido.");
        }

        return this.componentes.get(componentName);
    }

    enableComponent(component){
        this.activeComponents.push(component);
    }

    disableComponent(component){
        let position =  this.activeComponents.findIndex((element) => element == component);
        this.activeComponents[position].slice(position, 1);
    }

    start(time){
        for (let i=0; i < this.activeComponents.length; i ++)
        {
            this.activeComponents[i].start(time);
        }

    }

    update(time, delta){
        for (let i=0; i < this.activeComponents.length; i ++)
        {
            this.activeComponents[i].update(time, delta);
        }
    }
}

class Component{
    constructor(entidad) {
        this.entidad = entidad;
        this.enabled = true;
    }

    getEntity(){
        return this.entidad;
    }

    isEnabled()
    {
        return this.enabled;
    }

    setEnabled(state){
        this.enabled = state;
    }

    start(time){

    }
    update(time, delta){

    }

}