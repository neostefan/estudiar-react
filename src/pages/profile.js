// import React from "react";
// import {
//   engineering_depts,
//   science_depts,
//   faculties,
//   years,
//   checkErrorItem,
// } from "../util/gen-util";

// const Reducer = (state, action) => {
//   switch (action.type) {
//     case "CHANGING_INPUT":
//       return {
//         ...state,
//         [action.input]: action.value,
//       };
//     case "ENABLE_EDITING":
//       return {
//         ...state,
//         editing: true,
//       };
//     case "DISABLE_EDITING":
//       return {
//         ...state,
//         editing: false,
//       };
//     default:
//       return state;
//   }
// };

// const Profile = () => {
//   let [state, dispatch] = React.useReducer(Reducer, {
//     name: "testUser",
//     email: "test@test.com",
//     password: "wanker",
//     faculty: "Engineering",
//     dept: "",
//     year: 4,
//     editing: false,
//   });

//   let checkFaculty = () => {
//     if (state.faculty === "Engineering") {
//       return engineering_depts.map((dept) => (
//         <option key={dept} value={dept}>
//           {dept}
//         </option>
//       ));
//     }

//     if (state.faculty === "Science") {
//       return science_depts.map((dept) => (
//         <option key={dept} value={dept}>
//           {dept}
//         </option>
//       ));
//     }
//   };

//   let handleChange = (e) =>
//     dispatch({
//       type: "CHANGING_INPUT",
//       input: e.target.name,
//       value: e.target.value,
//     });

//   let editHandler = (e) => {
//     e.preventDefault();
//     dispatch({ type: "ENABLE_EDITING" });
//   };

//   let submitHandler = (e) => {
//     e.preventDefault();
//     dispatch({ type: "DISABLE_EDITING" });
//   };

//   let checkForErrors = (type) => {
//     if (state.errors.length > 0) {
//       console.log(state.errors);
//       let error = checkErrorItem(state.errors, type);
//       if (error !== undefined) {
//         return error.msg;
//       } else {
//         return false;
//       }
//     } else {
//       return false;
//     }
//   };

//   return <div></div>;

//   // return (
//   //   <div className="center-page-col">
//   //     <div className="auth-card w-auto">
//   //       <form className="flex flex-col" onSubmit={submitHandler}>
//   //         <div className="flex gap-8">
//   //           <div className="form-group">
//   //             <label className="text-purple-500">Name</label>
//   //             <input
//   //               className="input"
//   //               placeholder="Enter Your Full Name"
//   //               name="name"
//   //               type="text"
//   //               onChange={handleChange}
//   //             />
//   //           </div>
//   //           <div className="form-group">
//   //             <label className="text-purple-500">E-mail</label>
//   //             <input
//   //               className="input"
//   //               placeholder="Enter Your E-mail"
//   //               name="email"
//   //               type="email"
//   //               onChange={handleChange}
//   //               value={state.email}
//   //             />
//   //           </div>
//   //         </div>
//   //         <div className="flex">
//   //           <div className="h-1/3 form-group">
//   //             <label className="text-purple-500">Password</label>
//   //             <input
//   //               className="input"
//   //               placeholder="Enter Your Password"
//   //               name="password"
//   //               type="password"
//   //               onChange={handleChange}
//   //             />
//   //             {checkForErrors("password") ? (
//   //               <pre className="error">{checkForErrors("password")}</pre>
//   //             ) : null}
//   //             <div className="h-1/3 form-group">
//   //               <label className="text-purple-500">Faculty</label>
//   //               <select
//   //                 className="input"
//   //                 name="faculty"
//   //                 value={state.faculty}
//   //                 onChange={handleChange}
//   //               >
//   //                 {faculties.map((opt) => (
//   //                   <option key={opt} value={opt}>
//   //                     {opt}
//   //                   </option>
//   //                 ))}
//   //               </select>
//   //             </div>
//   //           </div>
//   //         </div>
//   //         <div className="flex"></div>
//   //         <div className="flex"></div>
//   //       </form>
//   //     </div>
//   //   </div>
//   // );

//   // return (
//   //     <Styles>
//   //         <form className="grid" onSubmit={submitHandler}>
//   //             <div className="title">Profile</div>
//   //             <div className="grid-item">
//   //                 <div>Name</div>
//   //                 <input
//   //                     type="text"
//   //                     name="name"
//   //                     value={state.name}
//   //                     onChange={handleChange}
//   //                     disabled={state.editing ? false : true}
//   //                 />
//   //             </div>
//   //             <div className="grid-item">
//   //                 <div>E-mail</div>
//   //                 <input
//   //                     name="email"
//   //                     type="email"
//   //                     value={state.email}
//   //                     onChange={handleChange}
//   //                     disabled={state.editing ? false : true}
//   //                 />
//   //             </div>
//   //             <div className="grid-item">
//   //                 <div>Password</div>
//   //                 <input
//   //                     name="password"
//   //                     value={state.password}
//   //                     disabled={state.editing ? false : true}
//   //                     type="password"
//   //                     onChange={handleChange}
//   //                 />
//   //             </div>
//   //             <div className="grid-item">
//   //                 <div>Faculty</div>
//   //                 <select
//   //                     name="faculty"
//   //                     onChange={handleChange}
//   //                     disabled={state.editing ? false : true}
//   //                     value={state.faculty}
//   //                 >
//   //                     {faculties.map(fac => (
//   //                         <option
//   //                             value={fac}
//   //                         >
//   //                             {fac}
//   //                         </option>
//   //                     ))}
//   //                 </select>
//   //             </div>
//   //             <div className="grid-item">
//   //                 <div>Department</div>
//   //                 <select
//   //                     name="dept"
//   //                     onChange={handleChange}
//   //                     disabled={state.editing ? false : true}
//   //                 >
//   //                     {checkFaculty()}
//   //                 </select>
//   //             </div>
//   //             <div className="grid-item">
//   //                 <div>Year</div>
//   //                 <select
//   //                     name="year"
//   //                     onChange={handleChange}
//   //                     disabled={state.editing ? false : true}
//   //                     value={state.yr}
//   //                 >
//   //                     {years.map(yr => (
//   //                         <option
//   //                             key={yr}
//   //                             value={yr}
//   //                         >
//   //                             {yr}
//   //                         </option>
//   //                     ))}
//   //                 </select>
//   //             </div>
//   //             { state.editing ?
//   //                 (<Button text="Submit" type="submit"/>) :
//   //                 (<Button click={editHandler} text="Edit" type="button"/>)
//   //             }
//   //         </form>
//   //     </Styles>
//   // );
// };

// export default Profile;
