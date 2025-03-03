import { myCreateElement } from './jsx-runtime';

const App = (
  <div className="container">
    <h1>Hello TSX Without React! 🎉</h1>
    <button onclick={() => alert('Hello!')}>Click Me</button>
  </div>
);

console.log(App);

document.body.appendChild(App);
