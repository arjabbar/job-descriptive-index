import { People, Work, Business, AttachMoney, EmojiPeople, RecordVoiceOver } from "@material-ui/icons";
import React from 'react';

const data = {
  facets: [
    {
      title: "People on Your Present Job",
      description: "Think of the majority of people with whom you work or meet in connection with your work. How well does each of the following words or phrases describe these people?",
      yesIf: "it describes the with whom you work",
      noIf: "it does not describe them",
      adjectives: {
        Stimulating: { isPositive: true },
        Boring: { isPositive: false },
        Slow: { isPositive: false },
        Helpful: { isPositive: true },
        Stupid: { isPositive: false },
        Responsible: { isPositive: true },
        Likeable: { isPositive: true },
        Intelligent: { isPositive: true },
        "Easy to make enemies": { isPositive: false },
        Rude: { isPositive: false },
        Smart: { isPositive: true },
        Lazy: { isPositive: false },
        Unpleasant: { isPositive: false },
        Supportive: { isPositive: true },
        Active: { isPositive: true },
        "Narrow interests": { isPositive: false },
        Frustrating: { isPositive: false },
        Stubborn: { isPositive: false }
      },
      avatar: <People />
    },
    {
      title: "Job in General",
      description: "Think of your job in general. All in all, what is it like most of the time?",
      yesIf: "it describes your job",
      noIf: "it does not describe it",
      adjectives: {
        Pleasant: { isPositive: true },
        Bad: { isPositive: false },
        Great: { isPositive: true },
        "Waste of time": { isPositive: false },
        Good: { isPositive: true },
        Undesirable: { isPositive: false },
        Worthwhile: { isPositive: true },
        "Worse than most": { isPositive: false },
        Acceptable: { isPositive: true },
        Superior: { isPositive: true },
        "Better than most": { isPositive: true },
        Disagreeable: { isPositive: false },
        "Makes me content": { isPositive: true },
        Inadequate: { isPositive: false },
        Excellent: { isPositive: true },
        Rotten: { isPositive: false },
        Enjoyable: { isPositive: true },
        Poor: { isPositive: false }
      },
      avatar: <Business />
    },
    {
      title: "Work on Present Job",
      description: "Think of the work you do at present. How well does each of the following words or phrases describe your work?",
      yesIf: "it describes your work",
      noIf: "it does not describe it",
      adjectives: {
        Fascinating: { isPositive: true },
        Routine: { isPositive: false },
        Satisfying: { isPositive: true },
        Boring: { isPositive: false },
        Good: { isPositive: true },
        "Gives sense of accomplishment": { isPositive: true },
        Respected: { isPositive: true },
        Exciting: { isPositive: true },
        Rewarding: { isPositive: true },
        Useful: { isPositive: true },
        Challenging: { isPositive: true },
        Simple: { isPositive: false },
        Repetitive: { isPositive: false },
        Creative: { isPositive: true },
        Dull: { isPositive: false },
        Uninteresting: { isPositive: false },
        "Can see results": { isPositive: true },
        "Uses my abilities": { isPositive: true }
      },
      avatar: <Work />
    },
    {
      title: "Pay",
      description: "Think of the pay you get now. How well does each of the following words or phrases describe your present pay?",
      yesIf: "it describes your pay",
      noIf: "it does not describe it",
      adjectives: {
        "Income adequate for normal expenses": { isPositive: true },
        Fair: { isPositive: true },
        "Barely live on income": { isPositive: false },
        Bad: { isPositive: false },
        Comfortable: { isPositive: true },
        "Less than I deserve": { isPositive: false },
        "Well paid": { isPositive: true },
        "Enough to live on": { isPositive: true },
        Underpaid: { isPositive: false }
      },
      avatar: <AttachMoney />
    },
    {
      title: "Opportunities for Promotion",
      description: "Think of the opportunities for promotion that you have now. How well does each of the following words or phrases describe these?",
      yesIf: "it describes your opportunites for promotion",
      noIf: "it does not describe it",
      adjectives: {
        "Good opportunities for promotion": { isPositive: true },
        "Opportunities somewhat limited": { isPositive: false },
        "Promotion on ability": { isPositive: true },
        "Dead-end job": { isPositive: false },
        "Good chance for promotion": { isPositive: true },
        "Very limited": { isPositive: false },
        "Infrequent promotions": { isPositive: false },
        "Regular promotions": { isPositive: true },
        "Fairly good chance for promotion": { isPositive: true }
      },
      avatar: <EmojiPeople />
    },
    {
      title: "Supervision",
      description: "Think of the kind of supervision that you get on your job. How well does each of the following words or phrases describe this?",
      yesIf: "it describes the supervision you get on the job",
      noIf: "it does not describe it",
      adjectives: {
        Supportive: { isPositive: true },
        "Hard to please": { isPositive: false },
        Impolite: { isPositive: false },
        "Praises good work": { isPositive: true },
        Tactful: { isPositive: true },
        Influential: { isPositive: true },
        "Up-to-date": { isPositive: true },
        Unkind: { isPositive: false },
        "Has favorites": { isPositive: false },
        "Tells me where I stand": { isPositive: true },
        Annoying: { isPositive: false },
        Stubborn: { isPositive: false },
        "Knows job well": { isPositive: true },
        Bad: { isPositive: false },
        Intelligent: { isPositive: true },
        "Poor planner": { isPositive: false },
        "Around when needed": { isPositive: true },
        Lazy: { isPositive: false }
      },
      avatar: <RecordVoiceOver />
    }
  ]
};

export default data;