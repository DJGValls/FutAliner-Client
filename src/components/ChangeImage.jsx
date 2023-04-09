import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../services/upload.services";
import { Button } from "react-bootstrap";

function ChangeImage(props) {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);
      setImage(response.data.image);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newImage = {
      image,
    };

    props.changeImage(newImage);
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-2 mt-2 m-1">
        <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4">
          <form onSubmit={handleSubmit}>
            <label htmlFor="image">
              <h6 className="text-big-yellow">
                Selecciona una imagen de Perfil
              </h6>
            </label>
            <div className="form-group mx-sm-4 pt-3">
              <input
                className="form-control"
                type="file"
                name="image"
                placeholder="email"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </div>
            {isUploading ? (
              <h3 class="date-of-birth-text">... cargando imagen</h3>
            ) : null}
            {image ? (
              <div className="justify-content-center pt-2 mt-2 m-1">
                <img src={image} alt="img" width={200} />
              </div>
            ) : null}
            <div className="form-group mx-sm-4 pb-4 pt-4">
              <Button type="submit" variant="warning" className="btn btn-block">
                <img
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681079669/FutAliner/ACTUALIZAR-GREEN_e2akd2.png"
                  alt="Actualizar"
                  width={120}
                />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangeImage;
