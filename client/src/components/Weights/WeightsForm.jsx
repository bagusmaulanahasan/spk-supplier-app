// import { useState, useEffect } from "react";

// export default function WeightsForm({ onSubmit, initialData }) {
//     const [form, setForm] = useState({ criteria_id: "", weight: "" });

//     useEffect(() => {
//         if (initialData) setForm(initialData);
//     }, [initialData]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     return (
//         <form
//             onSubmit={(e) => {
//                 e.preventDefault();
//                 onSubmit(form);
//             }}
//         >
//             <input
//                 name="criteria_id"
//                 value={form.criteria_id}
//                 onChange={handleChange}
//                 placeholder="Criteria ID"
//                 required
//             />
//             <input
//                 name="weight"
//                 value={form.weight}
//                 onChange={handleChange}
//                 placeholder="Weight"
//                 required
//             />
//             <button type="submit">Submit</button>
//         </form>
//     );
// }
