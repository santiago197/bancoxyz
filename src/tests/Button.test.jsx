import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import Button from '../components/ui/Button';

const wrapper = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

describe('Button', () => {
  it('renderiza el texto del botón', () => {
    render(<Button>Ingresar</Button>, { wrapper });
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
  });

  it('llama onClick al hacer click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>, { wrapper });
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('está deshabilitado cuando loading=true', () => {
    render(<Button loading>Cargando</Button>, { wrapper });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('no llama onClick cuando disabled=true', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>No click</Button>, { wrapper });
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
