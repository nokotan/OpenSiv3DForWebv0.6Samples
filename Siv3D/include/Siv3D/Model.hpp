﻿//-----------------------------------------------
//
//	This file is part of the Siv3D Engine.
//
//	Copyright (c) 2008-2021 Ryo Suzuki
//	Copyright (c) 2016-2021 OpenSiv3D Project
//
//	Licensed under the MIT License.
//
//-----------------------------------------------

# pragma once
# include "Common.hpp"
# include "Array.hpp"
# include "ModelObject.hpp"
# include "Material.hpp"
# include "AssetHandle.hpp"
# include "StringView.hpp"
# include "ColorOption.hpp"
# include "TextureDesc.hpp"

namespace s3d
{
	class Model : public AssetHandle<Model>
	{
	public:

		SIV3D_NODISCARD_CXX20
		Model();

		SIV3D_NODISCARD_CXX20
		explicit Model(const FilePathView path, ColorOption colorOption = ColorOption::Default);

		virtual ~Model();

		[[nodiscard]]
		const Array<ModelObject>& objects() const noexcept;

		[[nodiscard]]
		const Array<Material>& materials() const noexcept;

		[[nodiscard]]
		const Sphere& boundingSphere() const noexcept;

		[[nodiscard]]
		const Box& boundingBox() const noexcept;

		void swap(Model& other) noexcept;

		static void RegisterDiffuseTextures(const Model& model, TextureDesc textureDesc = TextureDesc::MippedSRGB);

		static void Draw(const ModelObject& modelObject, const Array<Material>& materials);
	};
}

template <>
inline void std::swap(s3d::Model& a, s3d::Model& b) noexcept;

# include "detail/Model.ipp"
