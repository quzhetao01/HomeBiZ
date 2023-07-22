import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import Home from '../pages/Home';
import RootLayout from "../layouts/RootLayout"
const customRender = (ui, options) =>
  render(ui, { wrapper: BrowserRouter, ...options });

  test("Searchbar changes", async () => {
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

    const listingMockResponse = {
        data: [{
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
            created_on: "2023-07-05T07:43:32.933Z"


        }],
        status: 200
    }
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        if (url === '/user') {
            return Promise.resolve(userMockResponse);
        } else {
            return Promise.resolve(listingMockResponse);
        }
        // You can return a default response if needed
        return Promise.resolve({ data: {}, status: 404 });
        });
    customRender(<Home/>);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        const searchInput = screen.getByTestId("search");
        fireEvent.change(searchInput, { target: {value: "test"}});
    })
    
    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
    
})



test("Favourite Listing", async () => {
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

    const listingMockResponse = {
        data: [{
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
            created_on: "2023-07-05T07:43:32.933Z"


        }],
        status: 200
        
    }

    const emptyListingResponse = {
        data: [],
        status: 200,
    }
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        if (url === '/user') {
            return Promise.resolve(userMockResponse);
        } else if (url === '/listing'){
            return Promise.resolve(listingMockResponse);
        } else {
            return Promise.resolve(emptyListingResponse)
        }
    });
    customRender(<Home/>);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await waitFor(() => {
        const heart = screen.getByTestId("fav");
        const computedStyleBeforeClick = window.getComputedStyle(heart);

        expect(computedStyleBeforeClick.color).toBe("grey");
        // eslint-disable-next-line testing-library/no-wait-for-side-effects
        fireEvent.click(heart);
        
        
    })
    const clickedHeart = screen.getByTestId("fav");
    const computedStyleAfterClick = window.getComputedStyle(clickedHeart);

    expect(computedStyleAfterClick.color).toBe("rgb(227, 36, 43)");
})

test("Navigate to Create Listing", async () => {
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

    const listingMockResponse = {
        data: [{
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
            created_on: "2023-07-05T07:43:32.933Z"


        }],
        status: 200
        
    }

    const emptyListingResponse = {
        data: [],
        status: 200,
    }
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        if (url === '/user') {
            return Promise.resolve(userMockResponse);
        } else if (url === '/listing'){
            return Promise.resolve(listingMockResponse);
        } else {
            return Promise.resolve(emptyListingResponse)
        }
    });
    customRender(<RootLayout/>);
    customRender(<Home/>)
    await waitFor(() => {
        const createListing = screen.getByTestId("createListing");
        // eslint-disable-next-line testing-library/no-wait-for-side-effects
        fireEvent.click(createListing);
        expect(window.location.pathname).toBe('/createListing')
    })
})

test("Navigate to View Listing", async () => {
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

    const listingMockResponse = {
        data: [{
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
            created_on: "2023-07-05T07:43:32.933Z"


        }],
        status: 200
        
    }

    const emptyListingResponse = {
        data: [],
        status: 200,
    }
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        if (url === '/user') {
            return Promise.resolve(userMockResponse);
        } else if (url === '/listing'){
            return Promise.resolve(listingMockResponse);
        } else {
            return Promise.resolve(emptyListingResponse)
        }
    });
    customRender(<RootLayout/>);
    customRender(<Home/>)
    await waitFor(() => {
        const viewListing = screen.getByTestId("viewListing");
        // eslint-disable-next-line testing-library/no-wait-for-side-effects
        fireEvent.click(viewListing);
        expect(window.location.pathname).toBe('/viewListing')
    })
})

test("Navigate to Favourite Listing", async () => {
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

    const listingMockResponse = {
        data: [{
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
            created_on: "2023-07-05T07:43:32.933Z"


        }],
        status: 200
        
    }

    const emptyListingResponse = {
        data: [],
        status: 200,
    }
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        if (url === '/user') {
            return Promise.resolve(userMockResponse);
        } else if (url === '/listing'){
            return Promise.resolve(listingMockResponse);
        } else {
            return Promise.resolve(emptyListingResponse)
        }
    });
    customRender(<RootLayout/>);
    customRender(<Home/>)
    await waitFor(() => {
        const favouriteListing = screen.getByTestId("viewFavourite");
        // eslint-disable-next-line testing-library/no-wait-for-side-effects
        fireEvent.click(favouriteListing);
        expect(window.location.pathname).toBe('/favouriteListings')
    })
})