class Scene extends Phaser.Scene{

    constructor() {
        super('game');
        this.activeEntities = [];
        this.entityMap = new Map();
    }

    addEntity(entity , autoActivate = true)
    {
        this.entityMap.set(entity.getName(), entity);
        if (autoActivate)
        {
            this.activeEntities.push(entity);
        }
    }

    deleteEntity(entity)
    {
        this.deativateEntity(entity);
        // opcional si queremos eliminar entidades completamente o solo desactivarlas
        this.entityMap.delete(entity.getName());
    }
    ativateEntity(entity)
    {
        var index = this.activeEntities.indexOf(entity);
        if (index ==  -1){
            this.activeEntities.push(index, 1);
        }
    }

    deativateEntity(entity)
    {
        var index = this.activeEntities.indexOf(entity);
        if (index >  -1){
            this.activeEntities.splice(index, 1);
        }
    }

    findEntityByName(name)
    {
        return this.entityMap.get(name);
    }

    start(){
        for (var i =0; i < this.activeEntities.length; i++)
        {
            this.activeEntities[i].start();
        }
    }

    update(time, delta){
        for (var i =0; i < this.activeEntities.length; i++)
        {
            this.activeEntities[i].update(time, delta);
        }
    }

}

class entity {
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

class SpriteRender extends Phaser.Physics.Arcade.Sprite{
    constructor(entity, x, y, sprite) {
        super(entity.getScene(), x, y, sprite);
        this.componentInit(entity);
        this.entidad.getScene().add.existing(this);

    }
}

SpriteRender.prototype.getEntity = Component.prototype.getEntity;
SpriteRender.prototype.componentInit = Component.prototype.init;