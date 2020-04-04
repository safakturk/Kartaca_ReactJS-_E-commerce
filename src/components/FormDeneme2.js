import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import alertify from "alertifyjs";

export default class FormDeneme2 extends Component {
    state = { email: "", password: "", city: "", description: ""};
    handleChange = event => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value});
    };

    handleSubmit = (event) =>{
        event.preventDefault();
        alertify.success(this.state.email + " Database eklendi !");
    };
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            onChange={this.handleChange} >
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Enter your password" 
                            onChange={this.handleChange} >
                        </Input>
                    </FormGroup>


                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input 
                            type="textarea" 
                            name="description" 
                            id="description" 
                            placeholder="Enter your description" 
                            onChange={this.handleChange} >
                        </Input>
                    </FormGroup>



                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input 
                            type="select" 
                            name="city" 
                            id="city" 
                            onChange={this.handleChange} >
                                <option>İstanbul</option>
                                <option>Ankara</option>
                                <option>İzmir</option>
                                <option>Bursa</option>
                                <option>Adana</option>
                                <option>Sivas</option>
                                <option>Hatay</option>
                                <option>Edirne</option>
                        </Input>
                    </FormGroup>
                    
                    <Button type="submit">Save</Button>

                </Form>
            </div>
        );
    }
}
