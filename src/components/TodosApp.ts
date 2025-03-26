import { customElement, onEvent, html } from '../lib/utils';
import { BaseComponent } from './BaseComponent';

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
    if (e.target instanceof HTMLButtonElement) {
      this.state.todos = this.state.todos.filter(
        (todo) => todo !== (e.target as HTMLButtonElement).dataset.id
      );
    }
  }

  async postRender() {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data: Todo[] = await res.json();
    this.state.isLoading = false;
    this.state.todos = [...data.map((todo) => todo.title), ...this.state.todos];
  }

  render() {
    return html`
      <div class="container grid grid-cols-2 gap-6">
        <form class="flex gap-2">
          <input type="text" required placeholder="enter your task here..." />
          <button type="submit">save</button>
        </form>
        <ul class="flex flex-col gap-2">
          ${() =>
            this.state.isLoading
              ? html`
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 300 150"
                    class="h-16 w-16 mx-auto mt-12"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-width="15"
                      stroke-linecap="round"
                      stroke-dasharray="300 385"
                      stroke-dashoffset="0"
                      d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        calcMode="spline"
                        dur="2"
                        values="685;-685"
                        keySplines="0 0 1 1"
                        repeatCount="indefinite"
                      ></animate>
                    </path>
                  </svg>
                `
              : ''}
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
