import { customElement, onEvent, html } from '../lib/utils';
import { BaseComponent } from '../lib/BaseComponent';
import { LoadingIcon } from '../icons';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type State = {
  todos: string[];
  isLoading: boolean;
};

@customElement('todo-app')
export class TodoApp extends BaseComponent<State> {
  pageTitle = 'Home';

  constructor() {
    super();
    this.state.todos = [];
    this.state.isLoading = true;
  }

  @onEvent('submit', 'form')
  handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const input = this.querySelector('input')!;
    this.state.todos = [input.value.trim(), ...this.state.todos];

    input.value = '';
  }

  @onEvent('click', "button[role='delete-todo']")
  deleteTodo(e: PointerEvent) {
    const target = e.target;

    if (target instanceof HTMLButtonElement) {
      this.state.todos = this.state.todos.filter((todo) => todo !== target.dataset.id);
    }
  }

  async postRender() {
    // sleep for 2s / mimic a slow request
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data: Todo[] = await res.json();
    this.state.isLoading = false;
    this.state.todos = data.map((todo) => todo.title).concat(this.state.todos);
  }

  render() {
    return html`
      <div class="container grid grid-cols-2 gap-6">
        <form>
          <fieldset ${this.state.isLoading && 'disabled'} class="flex gap-2">
            <input type="text" required placeholder="enter your task here..." />
            <button type="submit">save</button>
          </fieldset>
        </form>
        <ul class="flex flex-col gap-2">
          ${() => this.state.isLoading && LoadingIcon}
          ${() =>
            this.state.todos.map(
              (todo) => html`<li class="flex items-center border py-2 px-6 rounded-lg">
                <span class="grow">${todo}</span>
                <button role="delete-todo" data-id="${todo}" class="-mx-4">Delete</button>
              </li>`
            )}
        </ul>
      </div>
    `;
  }
}
