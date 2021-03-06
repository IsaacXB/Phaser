class Scene extends Phaser.Scene
{
    constructor()
    {
        super();
        this.activeEntities = [];
        this.entityMap = new Map();
    }

    addEntity(entity, autoActivate = true)
    {
        this.entityMap.set(entity.getName(),entity);
        if(autoActivate)
            this.activeEntities.push(entity);
    }

    deleteEntity(entity)
    {
        this.deactivateEntity(entity);
    }

    activateEntity(entity)
    {
        var index = activeEntities.indexOf(entity);
        if (index == -1) {
            this.activeEntities.push(entity);
        }
    }

    deactivateEntity(entity)
    {
        var index = this.activeEntities.indexOf(entity);
        if (index > -1) {
            this.activeEntities.splice(index, 1);
        }
    }

    findEntityByName(name)
    {
        return this.entityMap.get(tag);
    }

    start ()
    {
        for(var i = 0; i < this.activeEntities.length; i++ )
        {
            //console.log("Star "+this.activeEntities[i].getName());
            this.activeEntities[i].start();
        }
    }

    update (time, delta)
    {
        for(var i = 0; i < this.activeEntities.length; i++ )
        {
            this.activeEntities[i].update(time,delta);
        }
    }

}

class Component
{
    constructor(entity)
    {
        this.init(entity)
    }

    getEntity()
    {
        return this.entity;
    }

    init(entity)
    {
        this.entity = entity;
    }
}

class Entity
{
    constructor(name,scene)
    {
        this.name = name;
        this.scene = scene;
        //this.tag = tag;
        this.components = new Map();
        this.activeComponents = [];
    }

    getScene()
    {
        return this.scene;
    }

    getName()
    {
        return this.name;
    }

    /*getTag()
    {
        return this.tag;
    }*/

    addComponent(component, autoActivate = true)
    {
        if(component == undefined)
            console.error("Error, el componente debe estar definido");
        this.components.set(component.constructor.name,component);
        if(autoActivate)
            this.activeComponents.push(component);
    }

    getComponent(name)
    {
        return this.components.get(name);
    }

    start()
    {
        //recorro todos  los componentes activos para inicializarlos
        //console.log("longitud de los componentes "+this.activeComponents.length + " "+this.components.length);
        for(var i = 0; i < this.activeComponents.length; i++)
        {
            //console.log("componente i "+i+" name "+this.activeComponents[i].constructor.name);
            this.activeComponents[i].start();
        }
    }

    update(time,delta)
    {
        //recorro todos los componentes activos para darles update
        for(var i = 0; i < this.activeComponents.length; i++)
        {
            //console.log("update "+this.activeComponents[i].constructor.name);
            this.activeComponents[i].update(time,delta);
        }
    }

    //manda un mensaje a todos los componentes
    sendMessage(sender,msg,argm,checkRecption = false)
    {
        let count = 0;
        //console.error("Sending msg "+msg+" from "+sender+" to "+this+" with arg "+argm);
        for(var i = 0; i < this.activeComponents.length; i++)
        {

            //slice(1, 4);
            let fun = this.activeComponents[i][msg];
            if (fun != undefined) { 
                // safe to use the function
                fun.call(this.activeComponents[i],sender,argm);
                count++;
            }
        }
        if(checkRecption && count == 0)
            console.error("Nobody heard the message "+msg);
    }
}

class SpriteRender extends Phaser.Physics.Arcade.Sprite
{
    constructor(entity,x,y,spriteName)
    {
        super(entity.getScene(),x,y,spriteName);
        this.componentInit(entity);
        this.entity.getScene().add.existing(this);
    }

    /*getEntity()
    {
        return this.entity;
    }*/

    start()
    {

    }

    update(time,delta)
    {

    }

}

SpriteRender.prototype.getEntity = Component.prototype.getEntity;
SpriteRender.prototype.componentInit = Component.prototype.init;



class RigidBody extends Component
{
    constructor(entity,gravity,ftype)
    {
        super(entity);
        this.gravity = gravity;
        this.ftype = ftype;
        
    }

    setPhysicType(ftype)
    {
        this.sprite.sprite.body.physicsType = ftype;
    }

    allowGravity(gravity)
    {
        this.sprite.body.allowGravity = gravity;
    }

    start()
    {
        this.sprite = this.entity.getComponent('SpriteRender');
        this.entity.getScene().physics.add.existing(this.sprite);
        if(this.gravity != undefined)
            this.sprite.body.allowGravity = this.gravity;
        if(this.ftype != undefined)
            this.sprite.body.physicsType = this.ftype;
    }

    

    update(time,delta)
    {

    }

}