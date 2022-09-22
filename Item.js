class Item extends React.Component {
    constructor(props){
        super(props);
        this.enc = this.enc.bind(this)
        this.dec = this.dec.bind(this)
        this.state = {
            count:0,
            n : ''
        }
    }

    static getDerivedStateFromProps(props, state){
        return {count:props.item.count}
    }
    
    enc(event){
        event.stopPropagation()
        this.props.increace(this.props.item.name)
        this.setState({n:'as'})
    }
    
    dec(event){
        event.stopPropagation()
        this.props.decreace(this.props.item.name)
        this.setState({n:'as'})
    }

    render(){
        return(
            <div style={style.wrapper} onClick={()=>this.props.redirect_to_details(this.props.item.id_item)}>
                <p>
                    {this.props.item.name}
                </p>
                <p>
                    {this.props.item.price/100} usd
                </p>
                <div style={style.count.wrapper}>
                    <p style={style.count.p}>{this.props.item.count}</p>
                    <div>
                        <button style={style.count.btn} onClick={this.enc}>+</button>
                        <button style={style.count.btn} onClick={this.dec}>-</button>
                    </div>
                </div>
            </div>
        )
    }
}

let style = {
    wrapper:{
        fontSize: '30px',
        margin: '20px 0px',
        width: '90%',
        borderRadius: '10px',
        display: 'flex',
        background: 'white',
        border: 'solid 1px black',
        justifyContent: 'space-around',
        alignItems: 'center', 
        height: '100px'
    },
    count:{
        p:{
            margin: 0
        },
        wrapper:{
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center'
        },
        btn:{
            margin: '5px',
            background: 'green',
            borderRadius: '7px',
        }
    }

}