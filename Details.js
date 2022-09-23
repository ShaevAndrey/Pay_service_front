class Details extends React.Component {
    constructor(props){
        super(props);
        this.bay_item = this.bay_item.bind(this)
        this.GET_URL = 'https://shrouded-wave-99510.herokuapp.com/item/'
        this.BAY_URL = 'https://shrouded-wave-99510.herokuapp.com/bay/'
        this.state = {
            item:{}
        }
        fetch(`${this.GET_URL}${this.props.id}/`).then(response=>response.json()).then(data => this.setState({item:data}))

    }

    
    // Получаем адрес и id сессии и переходим по ссылке
    async bay_item(){
        const data = await fetch(`${this.BAY_URL}${this.state.item.id_item}/`).then(response=>response.json())
        if (data.error){
            alert(data.error)
        }
        else {document.location.href = data.url}
    }


    render(){
        return(
            <div style={detail_style.wrapp}>
                <h1>Роскошный товар: </h1>
                <div style={detail_style.title}>
                    <h1>{this.state.item.name}</h1>
                </div>
                <h3>Описание роскоши:</h3>
                <div style={detail_style.details}>
                    <p >{this.state.item.description}</p>
                </div>
                <h2>И удивительная цена:</h2>
                <div style={detail_style.price}>
                    <p >{this.state.item.price/100} USD</p>
                </div>
                <button style={detail_style.btn_bay} onClick={this.bay_item}>
                    Я хочу это!
                </button>
                
                <button style={detail_style.btn_bay} onClick={this.props.handleBack}>
                    Вернуться
                </button>
                
            </div>
        )
    }
}

 let detail_style = {
     wrapp:{
         width: '1000px',
         background: 'skyblue',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',

     },
    title:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '50px',
        margin: '30px 0',
        background: 'white',
        borderRadius: '10px'
    },
    details:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '200px',
        margin: '30px 0',
        fontSize: '25px',
        background: 'white',
        borderRadius: '10px'
    },
    price:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '100px',
        margin: '30px 0',
        fontSize: '25px',
        background: 'white',
        borderRadius: '10px'
    },
    btn_bay:{
        margin: '20px 0',
        width: '90%',
        background: '#82f04f',
        borderRadius: '10px',
        height: '30px'
    }
}