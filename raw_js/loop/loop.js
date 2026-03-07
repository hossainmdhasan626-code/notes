const laptop = {
    brand: "HP",
    processor: "i5",
    ram: "8GB",
    ssd: "256GB",
};

let data = 0;

// আউটপুট আসা উচিত: "এই ল্যাপটপ অবজেক্টে ৪টি তথ্য আছে।"

for (const key in laptop) {
    if (laptop[key]) {
        data++;
    }
}

console.log(data);