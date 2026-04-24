# 📦 React Props — প্রপস

---

## ১. Props কী?

Props হলো Parent থেকে Child component-এ data পাঠানোর উপায়। একমুখী — Parent → Child।

```jsx
// Parent পাঠাচ্ছে
<Button text="Login" color="blue" />

// এটা আসলে:
React.createElement(Button, { text: "Login", color: "blue" })

// মেমোরিতে:
{ type: Button, props: { text: "Login", color: "blue" } }
```

---

## ২. Props Receive করার ৪ উপায়

```jsx
// ক. Full props object (সব একসাথে)
const Button = (props) => {
  return <button style={{ backgroundColor: props.color }}>{props.text}</button>;
};

// খ. Destructuring — সবচেয়ে বেশি ব্যবহৃত ✅
const Button = ({ text, color }) => (
  <button style={{ backgroundColor: color }}>{text}</button>
);

// গ. Default Values — data না আসলে fallback
const Button = ({ text = "Click Me", color = "blue" }) => (
  <button style={{ backgroundColor: color }}>{text}</button>
);

// ঘ. Rename করা (Aliasing)
const Button = ({ text: label, color: bgColor }) => (
  <button style={{ backgroundColor: bgColor }}>{label}</button>
);
```

---

## ৩. Dynamic Classes — Tailwind-এ

```jsx
// ✅ সঠিক — Template literal
const Button = ({ bgColor, text }) => (
  <button className={`px-4 py-2 rounded bg-${bgColor}`}>{text}</button>
);

// ⚠️ Tailwind-এ সাবধান! Dynamic class কখনো কখনো purge হয়
// সমাধান: পুরো class name লিখো বা safelist-এ রাখো
```

---

## ৪. `children` Prop — Special Prop

```jsx
// Wrapper component বানাতে খুব লাগে
const Card = ({ children }) => (
  <div className="card-style">{children}</div>
);

// ব্যবহার:
<Card>
  <h1>Hasan</h1>
  <p>Junior Developer</p>
</Card>
```

---

## ৫. Props Spreading — সব একসাথে pass করা

```jsx
const buttonProps = { text: "Login", color: "blue", disabled: false };

// একটা একটা করে pass না করে
<Button text={buttonProps.text} color={buttonProps.color} />

// Spread দিয়ে সব একসাথে ✅
<Button {...buttonProps} />
```

---

## ৬. Props Forwarding — নিচে নিচে pass করা

```jsx
// সব props নিচে পাঠিয়ে দেওয়া
const Wrapper = (props) => (
  <div>
    <Button {...props} />
  </div>
);
```

---

## ৭. Props Immutable — বদলানো যায় না

```jsx
// ❌ ভুল — props সরাসরি বদলানো যাবে না
const Button = (props) => {
  props.text = "Changed"; // Error! Props read-only
};

// ✅ Props শুধু read করো, বদলানো দরকার হলে state ব্যবহার করো
```

---

## ৮. Object-এ `children` দেখতে কেমন?

```jsx
// JSX:
<div className="container">
  <Icon />
  <Button text="Login" />
</div>

// মেমোরিতে:
{
  type: 'div',
  props: {
    className: 'container',
    children: [
      { type: Icon, props: {} },
      { type: Button, props: { text: 'Login' } }
    ]
  }
}
// একাধিক children → Array হয়ে যায়
// একটা children → Single value থাকে
```

---

## 🎯 Interview Tips

- Props = Read-only, একমুখী (Parent → Child)।
- Props বদলাতে হলে Parent-এর state বদলাতে হয়।
- `children` → tag-এর মাঝখানে যা দেওয়া হয়।
- Destructuring → সবচেয়ে clean way।
- Default props → `= "default value"` syntax।
- Pure Function → same props → same output সবসময়।
