# include <Siv3D.hpp> // OpenSiv3D v0.6.4

class MyAudioStream : public IAudioStream
{
public:

	explicit MyAudioStream(Microphone&& microphone)
		: m_microphone{ std::move(microphone) }
		, m_sampleRate{ m_microphone.getSampleRate() }
		, m_delaySamples{ (m_sampleRate * 2) } // 2 秒遅れで録音波形をコピー（もっと短くしても良い）
		, m_bufferLength{ m_microphone.getBufferLength() } {}

private:

	Microphone m_microphone;

	uint32 m_sampleRate = Wave::DefaultSampleRate;

	uint32 m_delaySamples = 0;

	size_t m_bufferLength = 0;

	size_t m_readPos = 0;

	bool m_initialized = false;

	void getAudio(float* left, float* right, const size_t samplesToWrite) override
	{
		if (not m_initialized)
		{
			// 録音が始まっていない場合は無視
			if (m_microphone.posSample() == 0)
			{
				return;
			}

			// 現在の録音サンプル位置から m_delaySamples サンプルだけ引いた位置を読み取り開始位置に
			m_readPos = (m_microphone.posSample() + (m_bufferLength - m_delaySamples)) % m_bufferLength;

			m_initialized = true;
		}

		const size_t tailLength = Min((m_bufferLength - m_readPos), samplesToWrite);
		const size_t headLength = (samplesToWrite - tailLength);
		const Wave& wave = m_microphone.getBuffer();

		for (size_t i = 0; i < tailLength; ++i)
		{
			const auto& sample = wave[m_readPos + i];
			*left++ = sample.left;
			*right++ = sample.right;
		}

		for (size_t i = 0; i < headLength; ++i)
		{
			const auto& sample = wave[i];
			*left++ = sample.left;
			*right++ = sample.right;
		}

		m_readPos = ((m_readPos + samplesToWrite) % m_bufferLength);
	}

	bool hasEnded() override
	{
		return false;
	}

	void rewind() override {}
};


void Main()
{
	// if (System::EnumerateMicrophones().isEmpty())
	// {
	// 	throw Error{ U"No microphone is connected" };
	// }

	std::shared_ptr<MyAudioStream> audioStream;
	uint32 sampleRate = Wave::DefaultSampleRate;
	{
		Microphone mic{ 5s, Loop::Yes, StartImmediately::Yes};

		// if (not mic.isRecording())
		// {
		// 	throw Error{ U"Failed to start recording" };
		// }

		sampleRate = mic.getSampleRate();
		audioStream = std::make_shared<MyAudioStream>(std::move(mic));
	}

	Audio audio{ audioStream, Arg::sampleRate = sampleRate };
	audio.play();

	while (System::Update())
	{

	}
}