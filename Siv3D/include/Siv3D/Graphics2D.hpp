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
# include "Optional.hpp"
# include "BlendState.hpp"
# include "RasterizerState.hpp"
# include "SamplerState.hpp"
# include "ShaderStage.hpp"
# include "VertexShader.hpp"
# include "PixelShader.hpp"
# include "ConstantBuffer.hpp"
# include "Mat3x2.hpp"

namespace s3d
{
	namespace Graphics2D
	{
		/// @brief 
		/// @return 
		[[nodiscard]]
		Float4 GetColorMul();

		/// @brief 
		/// @return 
		[[nodiscard]]
		Float4 GetColorAdd();

		/// @brief 現在適用されているブレンドステートを返します。
		/// @return 現在適用されているブレンドステート
		[[nodiscard]]
		BlendState GetBlendState();

		/// @brief 現在適用されているラスタライザーステートを返します。
		/// @return 現在適用されているラスタライザーステート
		[[nodiscard]]
		RasterizerState GetRasterizerState();

		/// @brief 
		/// @param shaderStage 
		/// @param slot 
		/// @return 
		[[nodiscard]]
		SamplerState GetSamplerState(ShaderStage shaderStage = ShaderStage::Pixel, uint32 slot = 0);

		/// @brief シザー矩形を設定します。
		/// @param rect シザー矩形
		/// @remark シザー矩形は RasterizerState で scissorEnable を true にすることで有効になります。
		void SetScissorRect(const Rect& rect);

		[[nodiscard]]
		Rect GetScissorRect();

		[[nodiscard]]
		Optional<Rect> GetViewport();

		/// @brief 
		/// @return 
		[[nodiscard]]
		Optional<VertexShader> GetCustomVertexShader();

		/// @brief 
		/// @return 
		[[nodiscard]]
		Optional<PixelShader> GetCustomPixelShader();

		/// @brief 
		/// @return 
		[[nodiscard]]
		const Mat3x2& GetLocalTransform();

		/// @brief 
		/// @return 
		[[nodiscard]]
		const Mat3x2& GetCameraTransform();

		/// @brief 
		/// @return 
		[[nodiscard]]
		float GetMaxScaling() noexcept;

		/// @brief 
		/// @return 
		[[nodiscard]]
		Size GetRenderTargetSize();

		/// @brief 現在までの 2D 描画を実行します。
		//void Flush();

		/// @brief 頂点情報を設定せずに 2D 三角形を描画します。
		/// @remark 頂点シェーダを使って、各三角形に適切な頂点情報を与える必要があります。
		/// @param count 描画する三角形の個数
		void DrawTriangles(uint32 count);

		/// @brief 
		/// @tparam Type 
		/// @param stage 
		/// @param slot 
		/// @param buffer 
		template <class Type>
		inline void SetConstantBuffer(ShaderStage stage, uint32 slot, const ConstantBuffer<Type>& buffer);
	}
}

# include "detail/Graphics2D.ipp"
