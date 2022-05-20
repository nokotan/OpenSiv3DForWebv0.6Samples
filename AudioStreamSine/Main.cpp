# include <Siv3D.hpp> // OpenSiv3D v0.6.4

class MyAudioStream : public IAudioStream
{
public:

	void setFrequency(int32 frequency)
	{
		m_oldFrequency = m_frequency.load();

		m_frequency = frequency;
	}

private:

	size_t m_pos = 0;

	std::atomic<int32> m_oldFrequency = 440;

	std::atomic<int32> m_frequency = 440;

	void getAudio(float* left, float* right, const size_t samplesToWrite) override
	{
		const int32 oldFrequency = m_oldFrequency;
		const int32 frequency = m_frequency;
		const float blend = (1.0f / samplesToWrite);

		for (size_t i = 0; i < samplesToWrite; ++i)
		{
			const float t0 = (2_piF * oldFrequency * (static_cast<float>(m_pos) / Wave::DefaultSampleRate));
			const float t1 = (2_piF * frequency * (static_cast<float>(m_pos) / Wave::DefaultSampleRate));
			const float a = (Math::Lerp(std::sin(t0), std::sin(t1), (blend * i))) * 0.5f;

			*left++ = *right++ = a;
			++m_pos;
		}

		m_oldFrequency = frequency;

		m_pos %= Math::LCM(frequency, Wave::DefaultSampleRate);
	}

	bool hasEnded() override
	{
		return false;
	}

	void rewind() override
	{
		m_pos = 0;
	}
};

void Main()
{
	std::shared_ptr<MyAudioStream> audioStream = std::make_shared<MyAudioStream>();

	Audio audio{ audioStream };

	audio.play();

	double frequency = 440.0;

	while (System::Update())
	{
		if (SimpleGUI::Slider(U"{}Hz"_fmt(static_cast<int32>(frequency)), frequency, 220.0, 880.0, Vec2{ 40, 40 }, 120, 200))
		{
			audioStream->setFrequency(static_cast<int32>(frequency));
		}
	}
}