import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Text } from '@/components/ui/text';

// Questions for the travel profile questionnaire
const questions = [
  {
    id: 'travel-style',
    title: 'Travel Style',
    question: 'How do you prefer to travel?',
    options: ['Adventure', 'Luxury', 'Budget', 'Cultural']
  },
  {
    id: 'travel-companions',
    title: 'Travel Companions',
    question: 'Who do you typically travel with?',
    options: ['Solo', 'Friends', 'Partner', 'Family']
  },
  {
    id: 'travel-duration',
    title: 'Travel Duration',
    question: 'What is your ideal trip length?',
    options: ['Weekend', 'One Week', 'Two Weeks', 'Month+']
  },
  {
    id: 'accommodation',
    title: 'Accommodation',
    question: 'What type of accommodation do you prefer?',
    options: ['Hotels', 'Hostels', 'Airbnb', 'Camping']
  },
  {
    id: 'activities',
    title: 'Activities',
    question: 'What activities interest you most when traveling?',
    options: ['Sightseeing', 'Food & Dining', 'Relaxation', 'Outdoor Activities']
  },
  {
    id: 'planning-style',
    title: 'Planning Style',
    question: 'How do you plan your trips?',
    options: ['Detailed Itinerary', 'Rough Plan', 'Spontaneous', 'Tour Packages']
  }
];

export default function TravelProfileScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Save results and navigate back to home
      console.log('Profile completed:', selectedAnswers);
      router.push('/');
    }
  };

  const isOptionSelected = (option: string) => {
    return selectedAnswers[currentQuestion.id] === option;
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Screen 
        options={{
          title: currentQuestion.title,
          headerRight: () => (
            <Text className="text-white mr-4">
              {currentQuestionIndex + 1} of {totalQuestions}
            </Text>
          ),
        }}
      />
      <ScrollView 
        contentContainerStyle={styles.container}
        style={{
          backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background
        }}
      >
        <View style={styles.questionContainer}>
          <Text className="text-xl font-bold mb-6">
            {currentQuestion.question}
          </Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                variant={isOptionSelected(option) ? "default" : "outline"}
                className={`w-full mb-3 ${isOptionSelected(option) ? 'bg-primary' : ''}`}
                onPress={() => handleSelectOption(option)}
              >
                <Text 
                  className={`text-base ${isOptionSelected(option) ? 'text-white' : ''}`}
                >
                  {option}
                </Text>
              </Button>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            variant="default"
            className="w-full"
            onPress={handleNext}
          >
            <Text className="text-white">
              {currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Complete'}
            </Text>
            {currentQuestionIndex < totalQuestions - 1 && (
              <IconSymbol name="chevron.right" color="#fff" size={20} style={{ marginLeft: 8 }} />
            )}
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  questionContainer: {
    flex: 1,
    paddingTop: 40,
  },
  optionsContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  }
}); 