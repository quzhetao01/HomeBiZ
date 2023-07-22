import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import ViewListing from '../pages/ViewListing';
const customRender = (ui, options) =>
  render(ui, { wrapper: BrowserRouter, ...options });

test("Navigate to Edit Listing", () => {
    
})