import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import Register from '../pages/Register';
const customRender = (ui, options) =>
  render(ui, { wrapper: BrowserRouter, ...options });


test("Username State changes when input field changes", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);
    customRender(<Register/>);
    const usernameInput = screen.getByLabelText("username");
    fireEvent.change(usernameInput, { target: {value: "testUsername"}});
    expect(screen.getByDisplayValue(/testUsername/i)).toBeInTheDocument();
    
})

test("Password State changes when input field changes", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);

    customRender(<Register/>);
    const passwordInput = screen.getByLabelText("password");
    fireEvent.change(passwordInput, { target: {value: "ThisisaPassword"}});
    expect(screen.getByDisplayValue(/ThisisaPassword/i)).toBeInTheDocument();
    
})

test("FirstName State changes when input field changes", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);

    customRender(<Register/>);
    const firstNameInput = screen.getByLabelText("First name");
    fireEvent.change(firstNameInput, { target: {value: "thisisAFirstName"}});
    expect(screen.getByDisplayValue(/thisisAFirstName/i)).toBeInTheDocument();
    
})

test("LastName State changes when input field changes", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);

    customRender(<Register/>);
    const lastNameInput = screen.getByLabelText("Last name");
    fireEvent.change(lastNameInput, { target: {value: "thisisALastName"}});
    expect(screen.getByDisplayValue(/thisisALastName/i)).toBeInTheDocument();
    
})

test("Test Missing Username", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);

    customRender(<Register/>);
    const passwordInput = screen.getByLabelText("password");
    fireEvent.change(passwordInput, { target: {value: "ThisisaPassword"}});
    const firstNameInput = screen.getByLabelText("First name")
    fireEvent.change(firstNameInput, { target: {value: "testFirstname"}});
    const lastNameInput = screen.getByLabelText("Last name")
    fireEvent.change(lastNameInput, { target: {value: "testLastname"}});
    
    const submit = screen.getByTestId("submit");
    fireEvent.click(submit);
    const error = screen.getByTestId("error");
    expect(error).toBeInTheDocument();
    
})

test("Test Missing Password", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);

    customRender(<Register/>);
    const usernameInput = screen.getByLabelText("username");
    fireEvent.change(usernameInput, { target: {value: "testUsername"}});
    const firstNameInput = screen.getByLabelText("First name")
    fireEvent.change(firstNameInput, { target: {value: "testFirstname"}});
    const lastNameInput = screen.getByLabelText("Last name")
    fireEvent.change(lastNameInput, { target: {value: "testLastname"}});
    const submit = screen.getByTestId("submit");
    fireEvent.click(submit);
    const error = screen.getByTestId("error");
    expect(error).toBeInTheDocument();
    
})

test("Test Missing First Name", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);

    customRender(<Register/>);
    const usernameInput = screen.getByLabelText("username");
    fireEvent.change(usernameInput, { target: {value: "testUsername"}});
    const passwordInput = screen.getByLabelText("password");
    fireEvent.change(passwordInput, { target: {value: "ThisisaPassword"}});
    const lastNameInput = screen.getByLabelText("Last name")
    fireEvent.change(lastNameInput, { target: {value: "testLastname"}});

    const submit = screen.getByTestId("submit");
    fireEvent.click(submit);
    const error = screen.getByTestId("error");
    expect(error).toBeInTheDocument();
    
})

test("Test Missing Last Name", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);

    customRender(<Register/>);
    const usernameInput = screen.getByLabelText("username");
    fireEvent.change(usernameInput, { target: {value: "testUsername"}});
    const passwordInput = screen.getByLabelText("password");
    fireEvent.change(passwordInput, { target: {value: "ThisisaPassword"}});
    const firstNameInput = screen.getByLabelText("First name")
    fireEvent.change(firstNameInput, { target: {value: "testFirstname"}});
    

    const submit = screen.getByTestId("submit");
    fireEvent.click(submit);
    const error = screen.getByTestId("error");
    expect(error).toBeInTheDocument();
    
})