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
	enum class ToastNotificationState : uint8
	{
		None_,

		Shown,

		Activated,

		UserCanceled,

		ApplicationHidden,

		TimedOut,

		Error,
	};
}
