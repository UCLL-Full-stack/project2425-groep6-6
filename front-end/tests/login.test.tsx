import React from "react";
import  {render, screen} from '@testing-library/react';
import UserLoginForm from "@components/users/UserLoginForm";

window.React = React;

test('dit is de eerste test vul  later aan', async () => {
render(<UserLoginForm />)

expect(screen.getByText('username'))
expect(screen.getByLabelText(/username/i))
expect(screen.getByLabelText(/password/i))


})

