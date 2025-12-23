import React, { useEffect, useState } from "react";

export default function UserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    profile_image: "",
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [imageUploaded, setImageUploaded] = useState(false);

  // Fetch user data
  useEffect(() => {
    fetch(`http://localhost/api/get_user_profile.php?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFormData(data.user);
          if (data.user.profile_image) {
            setPreview(`http://localhost/api/uploads/${data.user.profile_image}`);
            setImageUploaded(true);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user.id]);

  // Input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageUploaded(false);
    }
  };

  // Validate before saving
  const validate = () => {
  let newErrors = {};

  // Name validation
  if (!formData.name.trim()) newErrors.name = "Name is required";

  // Phone validation: must start with 97 or 98 and be exactly 10 digits
  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (!/^(97|98)\d{8}$/.test(formData.phone)) {
    newErrors.phone = "Phone must start with 97 or 98 and be 10 digits long";
  }

  // Address validation
  if (!formData.address.trim()) newErrors.address = "Address is required";

  // Bio validation
  if (formData.bio.length > 200)
    newErrors.bio = "Bio cannot exceed 200 characters";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  // Submit data
  const handleSave = () => {
    if (!validate()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("user_id", user.id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("bio", formData.bio);
    if (file) formDataToSend.append("profile_image", file);

    fetch("http://localhost/api/update_user_profile.php", {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.success) {
          setImageUploaded(true);
          window.location.reload();
        }
      })
      .catch(() => alert("Error updating profile"));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">My Profile</h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={preview || "https://via.placeholder.com/120"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border mb-2"
        />
        {!imageUploaded ? (
          <input type="file" accept="image/*" onChange={handleImageChange} />
        ) : (
          <button
            onClick={() => setImageUploaded(false)}
            className="text-sm text-indigo-600 hover:underline"
          >
            Change Picture
          </button>
        )}
      </div>

      {/* Info Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={formData.email || ""}
            readOnly
            className="border rounded w-full px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            rows="3"
          ></textarea>
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
