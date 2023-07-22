import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import Login from '../pages/Login';

// setupTests.js

// import App from '../App';
const customRender = (ui, options) =>
  render(ui, { wrapper: BrowserRouter, ...options });



test("Username State changes when input field changes", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);
    customRender(<Login/>);
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

    customRender(<Login/>);
    const passwordInput = screen.getByLabelText("password");
    fireEvent.change(passwordInput, { target: {value: "ThisisaPassword"}});
    expect(screen.getByDisplayValue(/ThisisaPassword/i)).toBeInTheDocument();
    
})

test("Test Missing Username", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);

    customRender(<Login/>);
    const passwordInput = screen.getByLabelText("password");
    fireEvent.change(passwordInput, { target: {value: "ThisisaPassword"}});
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

    customRender(<Login/>);
    const usernameInput = screen.getByLabelText("username");
    fireEvent.change(usernameInput, { target: {value: "testUsername"}});
    const submit = screen.getByTestId("submit");
    fireEvent.click(submit);
    const error = screen.getByTestId("error");
    expect(error).toBeInTheDocument();
    
})

test("Navigate to home page", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);
    customRender(<Login/>)
    const usernameInput = screen.getByLabelText("username");
    fireEvent.change(usernameInput, { target: {value: "test"}});
    const passwordInput = screen.getByLabelText("password");
    fireEvent.change(passwordInput, { target: {value: "123"}});

    const submit = screen.getByTestId("submit");
    fireEvent.click(submit);
    expect(window.location.pathname).toBe('/')

})