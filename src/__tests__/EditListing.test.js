import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import EditListing from '../pages/EditListing';
const customRender = (ui, options) =>
  render(ui, { wrapper: BrowserRouter, ...options });

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        state: {
            listing: {
                _id: "64a51f24665de511e092289b",
                title: "Cozy Crafts 2",
                description: "description",
                township: "Woodlands",
                location: "Yishun",
                displayImage: "1fDzo8WJYo7m5QHsOQt6M6rOb6f54EovO",
                descriptionImages: [
                    "1LmDeZR6nhxZbqCXwBI3Ire1yJT6UNs_6",
                    "1Lodvxn570PsWASsO0e8bPmtifJoJSuLr",
                    "1oYt8DFjMh65PDquw76fvop2C_Bsx_jwB",
                    "1RnlDwSlDWrX9miRe2B4IHdG5XkncXZC7",
                    "1seCigKFXdWuSD2iaCAHzZmJf1SAi6UmY",
                    "1SnQC5xZ2m2W5HXci0XhqmToyQgyRMuwk",
                    "1ColvI91zUirxT1XIX-EM1tUSKm-3uNqy",
                    "16flofF2vxDBY9o0VG51Jn5P4ac0J5D0N"
                ],
                contact: "90694362",
                whatsapp: false,
                telegram: true,
                email: "quzhetao2001@gmail.com",
                category: "Fashion",
                reviews: [
                    {
                    _id: "64a524eaca2ea35234ea4c3e",
                    rating: 5,
                    description: "Testing User Display on Reviews",
                    created_by_id: "64a51e09665de511e092288b",
                    listing: "64a51f24665de511e092289b",
                    },],
                user: "64a51e09665de511e092288b",
                created_on: "2023-07-05T07:43:32.933Z",
                menu: [{
                    price: "5",
                    title: "Craft 1",
                    _id: "64b40e6be4f61db640da4009"
                }]
    
    
            }
        }
    })
}));

test("Test Accordion", () => {
    customRender(<EditListing/>);
    const button = screen.getByText("Title and Description");
    fireEvent.click(button);
    const title= screen.getByTestId("title");
    expect(title).toBeInTheDocument();
})

test("Empty Menu Field giving error", () => {
    customRender(<EditListing/>);
    const button = screen.getByText("Menu");
    fireEvent.click(button);
    const submit = screen.getByTestId("submitMenu");
    fireEvent.click(submit);
    const missing = screen.getByTestId("missing");
    expect(missing).toBeInTheDocument();
})
