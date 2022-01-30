import { screen, waitFor } from "@testing-library/react";

export async function waitByLoading() {
  try {
    await screen.findByText(/Carregando Dados.../i)

    await waitFor(() => expect(screen.queryByText('Carregando Dados...')).not.toBeInTheDocument());
  } catch(error: any) {
  }
}