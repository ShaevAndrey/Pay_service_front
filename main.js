class Items extends React.Component {
    constructor(props){
        super(props);
        this.count_dec = this.count_dec.bind(this)
        this.count_inc = this.count_inc.bind(this)
        this.redirect_to_details = this.redirect_to_details.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.state = {
            items : [],
            screen:{
                details:false,
                item_list:true
            },
            details_item_id : 0
        }
        
        // Запрос списка товаров
        fetch('http://127.0.0.1:8000/get_all_items/').
        then(response => response.json()).
        then(data=>{
            data = data.map(item=>{item.count = 0
                                    return item} )
            this.setState({items:data})
        }).
        catch(error=>alert('Ошибка загрузки'))

            
    }

    // Увеличение количество товара в при покупке
    count_inc(item_name){
        for (let i=0; i<this.state.items.length; i++) {
            if (item_name===this.state.items[i].name){                
                this.state.items[i].count = this.state.items[i].count + 1                
            }
        }
    }

    // Уменьшение количество товара в при покупке
    count_dec(item_name){
        this.setState(state=>{
            for (let item of state.items) {
                if (item_name===item.name){
                    if (item.count >= 1){
                        item.count = item.count - 1}
                }
            }
        })
    }

    // Отправка списка покупок на сервер. 
    fetchData(){
        let data = this.state.items.filter(item=>item.count>0)
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        }
        fetch('http://127.0.0.1:8000/bay_items/', options).
        then(response => response.json()).
        then(data=>{
            if (data.error){
                alert(data.error)}
            else {document.location.href = data.url}}).
        catch(error=>alert(error.message))

    }

    // Переход к деталям изделия
    redirect_to_details(id){
        this.setState(state=>state.screen.details=true)
        this.setState(state=>state.screen.item_list=false)
        this.setState({details_item_id:id})

    }

    // Вернуться на главную страницу
    handleBack(){
        this.setState(state=>state.screen.details=false)
        this.setState(state=>state.screen.item_list=true)
        this.setState({details_item_id:0})

    }

    render(){

        // Главная страница
        if (this.state.screen.item_list) {
            return(
                <div style={styleItems}>
                    <h1>Товары:</h1>
                    {this.state.items.map(item=><Item item = {item} 
                                                key = {item.id_item}
                                                increace={this.count_inc} 
                                                decreace={this.count_dec}
                                                redirect_to_details={this.redirect_to_details}/>)}
                    
                    <button style={btnStyle} onClick = {this.fetchData}>Оплатить</button>
                </div>
            )
        }

        //Страница деталей 
        if (this.state.screen.details){
            return (<Details id = {this.state.details_item_id} handleBack = {this.handleBack}/>)
        }
    }
}



let styleItems = {
    background: 'skyblue',
    width: '1000px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px'
}
let btnStyle = {
    width: '90%',
    background: '#82f04f',
    height: '30px',
    borderRadius: '10px',
    marginBottom: '20px'
}