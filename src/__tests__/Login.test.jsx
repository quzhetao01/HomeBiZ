import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import LoginInput from '../components/LoginInput';
// import App from '../App';

test('test', () => {
    render(<LoginInput />);
    expect(true).toBe(true);  
})