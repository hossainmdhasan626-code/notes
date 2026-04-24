# 📄 JSX & React Elements

---

## ১. JSX কী?

JSX (JavaScript XML) হলো syntactic sugar। দেখতে HTML-এর মতো কিন্তু আসলে JavaScript।

```jsx
// আমরা যা লিখি (JSX)
const element = <h1 className="title">Hello, Hasan!</h1>;

// Babel এটাকে বানায়
const element = React.createElement("h1", { className: "title" }, "Hello, Hasan!");

// যেটা মেমোরিতে থাকে (React Element = JS Object)
const element = {
  type: "h1",
  props: {
    className: "title",
    children: "Hello, Hasan!"
  }
};
```

---

## ২. JSX-এর Rules — মানতেই হবে

```jsx
// ✅ className (HTML-এ class)
<div className="container">

// ✅ htmlFor (HTML-এ for)
<label htmlFor="email">Email</label>

// ✅ সব tag close করতে হবে (self-closing সহ)
<input type="text" />
<br />

// ✅ CamelCase (HTML-এ onclick → onClick)
<button onClick={handleClick}>

// ✅ একটাই root element (বা Fragment <>)
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

---

## ৩. Interpolation — `{}` এর ভেতর JS লেখা

```jsx
const name = "Hasan";
const age = 25;

// যেকোনো JS Expression `{}` এর ভেতর লেখা যায়
const element = <h1>Hello, {name}! Age: {2026 - 2001}</h1>;

// Function call
<p>{getGreeting()}</p>

// Ternary (condition)
<span>{isLoggedIn ? "Welcome!" : "Please login"}</span>

// Array map (list render)
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>
```

---

## ৪. React Element — JS Object কেমন দেখায়

```jsx
// JSX:
<div className="flex p-4">
  <div className="text-red">Child 1</div>
  <div className="text-blue">Child 2</div>
</div>
```

```js
// মেমোরিতে Object Tree:
{
  type: 'div',
  props: {
    className: 'flex p-4',
    children: [
      {
        type: 'div',
        props: { className: 'text-red', children: 'Child 1' }
      },
      {
        type: 'div',
        props: { className: 'text-blue', children: 'Child 2' }
      }
    ]
  }
}
// এই nested object tree-ই হলো Virtual DOM!
```

---

## ৫. Component vs HTML Tag — কীভাবে চেনে?

```jsx
// type lowercase string = HTML tag
React.createElement("div", ...) → <div>

// type Uppercase function = React Component
React.createElement(Button, ...) → <Button>
```

> এই কারণেই React component-এর নাম **Capital letter** দিয়ে শুরু করতে হয়।

---

## ৬. Conversion Journey — সম্পূর্ণ Flow

```
JSX কোড
  ↓ Babel/Vite (esbuild)
React.createElement() calls
  ↓ Browser-এ run হলে
React Elements (JS Objects)
  ↓ React Library
Virtual DOM (Nested Object Tree)
  ↓ Reconciliation
Real DOM (Browser-এ যা দেখা যায়)
```

---

## ৭. Babel vs Vite — পার্থক্য

```js
const comparison = {
  babel: {
    কাজ: "JSX → JS অনুবাদ করা (Transpiler)",
    language: "JavaScript দিয়ে বানানো",
    drawback: "Slow — project বড় হলে সময় বেশি লাগে",
  },
  vite: {
    কাজ: "Build tool — server চালায়, transpile করে, bundle করে",
    engine: "esbuild ব্যবহার করে (Go ভাষায় বানানো — অনেক দ্রুত)",
    advantage: "Unbundled approach — যেটা browser চায় শুধু সেটাই process করে",
  }
};
```

---

## ৮. React Elements Immutable কেন?

```js
// ❌ এভাবে element বদলানো যায় না
element.props.children = "New text"; // কাজ করবে না

// ✅ নতুন element তৈরি করতে হয়
// React নিজেই এটা করে — পুরনো element-এর সাথে নতুনটা compare করে (Diffing)
```

---

## 🎯 Interview Tips

- JSX = Syntactic Sugar → পর্দার আড়ালে `React.createElement()` call হয়।
- Component নাম Uppercase শুরু করতে হয় — নইলে React HTML tag ভাববে।
- `{}` এর ভেতর যেকোনো JS **Expression** লেখা যায় (Statement না — যেমন `if/for`)।
- React Element = Plain JS Object — Virtual DOM এই object-এর tree।
- Babel = Translator, Vite = Full Factory (translate + serve + bundle)।
