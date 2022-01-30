import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { lazy, Suspense } from 'react';
import Spinner from '../components/Spinner';
import { rest } from 'msw';
import { waitByLoading } from 'src/helpers/waitByLoading';
import { setupServer } from 'msw/node';
import { userDataMock } from '../mocks/userDataMock';
import { userPostsDataMock } from '../mocks/userPostsDataMock';
import userEvent from '@testing-library/user-event';

const App = lazy(() => import('../app/home'));

const handlers = [
  rest.get(
    `https://jsonplaceholder.typicode.com/users`, 
    async (req, res, ctx) => {
      if(req.url.searchParams.get('_limit') === '3' && req.url.searchParams.get('_start') === '0') {
        return res(ctx.json(userDataMock.slice(0, 3)));
      }else if(req.url.searchParams.get('_start') === '3'){
        return res(ctx.json(userDataMock.slice(3, 6)));
      }
    }
  ),
  rest.get(
    `https://jsonplaceholder.typicode.com/posts`, 
    async (req, res, ctx) => {
      if(req.url.searchParams.get('userId') === '1' && req.url.searchParams.get('_start') === '0' && req.url.searchParams.get('_limit') === '3') {
        return res(ctx.json(userPostsDataMock.slice(0, 3)));
      }else if(req.url.searchParams.get('_start') === '3'){
        return res(ctx.json(userPostsDataMock.slice(3, 6)));
      }
    }
  ),
]

const server = setupServer(...handlers);

describe('Userlist', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render users', async () => {
    render(
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    );
    try{
      await waitForElementToBeRemoved(screen.queryByText('Carregando...'), {
        timeout: 2000,
      });
    }catch(err){}
    
    expect(screen.getByRole('heading', {name: /usuarios/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /adicionar mais/i})).toBeInTheDocument();

    await waitByLoading();

    expect(screen.getByRole('heading', {name: /Leanne Graham/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /Ervin Howell/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /Clementine Bauch/i})).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', {name: /adicionar mais/i}));

    await waitByLoading();

    expect(screen.getByRole('heading', {name: /Patricia Lebsack/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /Chelsey Dietrich/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /Mrs. Dennis Schulist/i})).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', {name: /leanne graham/i}));
    
    await waitByLoading();

    expect(screen.getByText(/postagens » leanne graham/i)).toBeInTheDocument();

    await waitByLoading();

    expect(screen.getByRole('heading', {name: /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /qui est esse/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /ea molestias quasi exercitationem repellat qui ipsa sit aut/i})).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', {name: /buscar mais \+/i}));

    await waitByLoading();

    expect(screen.getByRole('heading', {name: /eum et est occaecati/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /nesciunt quas odio/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /dolorem eum magni eos aperiam quia/i})).toBeInTheDocument();

    await waitFor(() => userEvent.click(screen.getAllByRole('button', { name: /deletar/i })[0]));

    expect(screen.queryByRole('heading', {name: /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i})).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', {name: /x/i}))
    await waitForElementToBeRemoved(() => screen.getByRole('button', {name: /x/i}));

    await waitByLoading();
    expect(screen.getByRole('heading', {name: /Leanne Graham/i})).toBeInTheDocument();
  })
})