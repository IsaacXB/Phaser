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
        this.scene.addEntity(this);
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

    sendMessage(sender, msg, arg,checkerReception = false){
        let count = 0;
        for (var i =0; i< this.activeComponents.length; i++)
        {
            let fun  = this.activeComponents[i][msg];
            if (fun != undefined){
                this.call(this.activeComponents[i], sender, arg);
                count++;
            }
        }
        if (count > 0 && checkerReception)
        {
            console.error("Nobody heard the message: " + msg);
        }
    }
}

class Component{
    constructor(entidad) {
        this.init(entidad);
        this.enabled = true;
    }

    init(entidad){
        this.entidad = entidad;

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

    start(time){

    }
    update(time, delta){

    }
}

SpriteRender.prototype.getEntity = Component.prototype.getEntity;
SpriteRender.prototype.componentInit = Component.prototype.init;

class RigidBody extends Component{
    constructor(entity, gravity, ftype) {
        super(entity);
        this.gravity = gravity;
        this.ftype = ftype;
        this.sprite = undefined;
    }

    setPhysicType(ftype){
        this.ftype = ftype;
    }

    allowGravity(gravity){
        this.sprite.body.allowGravity(gravity);
    }

    start(){
        this.sprite = this.getEntity().getComponent("SpriteRender");
        this.getEntity().getScene().physics.addExisting(this.sprite);
        if (this.gravity != undefined)
        {
            this.sprite.body.allowGravity(this.gravity);
        }
        if (this.ftype != undefined)
        {
            this.sprite.body.allowGravity(this.ftype);
        }
    }

    update(time, delta){

    }
}