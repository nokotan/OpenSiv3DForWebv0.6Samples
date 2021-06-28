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

namespace s3d
{
	enum class KlattWaveform : uint8
	{
		Saw,
		
		Triangle,
		
		Sine,
		
		Square,
		
		Pulse,
		
		Noise,
		
		Warble,
	};

	struct KlattTTSParameters
	{
		int32 baseFrequency = 1330;

		double baseSpeed = 10.0;

		double declination = 0.5;

		double speed = 1.0;

		KlattWaveform waveform = KlattWaveform::Square;
	};
}
