class destroy extends Component{
    constructor(entity) {
        super(entity);
    }

    destroy(){
        this.getEntity().getScene().deleteEntity(this.getEntity());
    }

    start(){

    }

    update(time, delta) {

    }
}