import React, { Component } from "react";

export default class FormDeneme1 extends Component {
    state = { userName: '' , city: ''};
    onchangeHandler = event => {
        this.setState({/*userName:event.target.value, /*Textbox da ki yazı değiştikçe bu yazıyı userName değişkenine geçiriyoruz*/});
        let name = event.target.name;
        let value = event.target.value;

        this.setState({[name]: value})
    };
    onSubmitHandler = (event) => {
        event.preventDefault(); /* "Default davranışı sergileme sakın" anlamına geliyor burada da sayfanın yenilenmemesini sağlayarak bilgilerin uçmasını engelliyor */
        alert(this.state.userName);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>User Name</h3>
                    <input name="userName" type="text" onChange={this.onchangeHandler}></input>
                    <h3>User Name {this.state.userName}</h3>

                    <h3>City</h3>
                    <input name="city" type="text" onChange={this.onchangeHandler}></input>
                    <h3>City {this.state.city}</h3>


                    <input type="submit" value="Save"></input>
                </form>
                
            </div>
        );
    }
}
