import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import CreateListing from '../pages/CreateListing';
const customRender = (ui, options) =>
  render(ui, { wrapper: BrowserRouter, ...options });


test("Menu Modal shows up when clicked", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);
    customRender(<CreateListing/>);
    const menuButton = screen.getByTestId("menuButton");
    fireEvent.click(menuButton);
    const menu = screen.getByTestId("menu");
    expect(menu).toBeInTheDocument();
    
})

test("Error modal shows up when there are missing fields", () => {
    const userMockResponse = {
        data: "No user found",
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);
    customRender(<CreateListing/>);
    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);
    const error = screen.getByTestId("error");
    expect(error).toBeInTheDocument();
})

test("Form does not show up when user has a category", async () => {
    const userMockResponse = {
        data: {
            category: "Fashion",
            favourites: ['64b10ccf837fab41d623de70'],
            firstName: "Developer",
            lastName: "One",
            username: "test",
            listing: "64a51f24665de511e092289b",
        },
        status: 200
    }
    jest.spyOn(axios, 'get').mockResolvedValue(userMockResponse);
    customRender(<CreateListing/>);
    await waitFor(() => {
        const hasListing = screen.getByTestId("hasListing")
        expect(hasListing).toBeInTheDocument();
    })
    
})
