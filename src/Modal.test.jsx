import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import '@testing-library/jest-dom';

describe("Modal", () => {
    test("render Modal", () => {
        render(<Modal/>);
    })
});