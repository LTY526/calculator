"use client";

import { useState, useEffect } from 'react';
import styles from './Calculator.module.css';

type Digits = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '.';
type Operators =  '+' | '-' | '*' | '/' | '=';
type Clear = 'C';

export default function Calculator() {
  const [calculatorState, setCalculatorState] = useState({
    left: '0',
    right: '',
    operator: '',
    result: '',
  });
  const [display, setDisplay] = useState('0');


  const isDigit = (key: string): key is Digits => { 
    return /\d/.test(key) || key == '.';
  };

  const isOperator = (key: string): key is Operators => {
    return /[+\-*/=]/.test(key);
  };

  const isClear = (key: string): key is Clear => {
    return key === 'C';
  };

  const updateExpression = (key: Digits | Operators | Clear): void => {
    let updatedLeft = calculatorState.left;
    let updatedRight = calculatorState.right;
    let updatedResult = calculatorState.result;
    let updatedOperator = calculatorState.operator;

    if (isClear(key)) {
      updatedLeft = '0';
      updatedRight = '';
      updatedResult = '';
      updatedOperator = '';
    } else if (isDigit(key)) {
      if (updatedResult != '') {
        updatedLeft = '0';
        updatedRight = '';
        updatedResult = '';
        updatedOperator = '';
      }
      if (key == '.') {
        if (updatedLeft.split('.')[0].length < 8) {
          updatedLeft = !updatedLeft.includes('.') ? updatedOperator == '' ? (updatedLeft == '0' || updatedLeft == '') ? '0' + key : updatedLeft + key : updatedLeft : updatedLeft;
        }
        if (updatedRight.split('.')[0].length < 8) {
          updatedRight = !updatedRight.includes('.') ? updatedOperator != '' ? updatedRight == '' ? '0' + key : updatedRight + key : updatedRight : updatedRight;
        }
      }
      else {
        if (updatedLeft.split('.')[0].length < 8) {
          updatedLeft = updatedOperator == '' ? (updatedLeft == '0' || updatedLeft == '') ? key : updatedLeft + key : updatedLeft;
        }
        if (updatedRight.split('.')[0].length < 8) {
          updatedRight = updatedOperator != '' ? updatedRight + key : updatedRight;
        }
      }
    } else if (isOperator(key)) {
      if (updatedResult != '' && updatedLeft == '0') {
        updatedLeft = updatedResult;
        updatedResult = '';
      }
      if (updatedLeft != '' && updatedOperator != '' && updatedRight != '') {
        updatedResult = parseFloat((eval(updatedLeft + updatedOperator + updatedRight) as number).toFixed(2)).toString();
        updatedLeft = updatedResult;
        updatedRight = '';
      }
      if (key != '=') {
        updatedOperator = key;
      } else {
        updatedLeft = '0'
        updatedOperator = '';
        updatedRight = '';
      }
    }

    setCalculatorState({
      left: updatedLeft,
      right: updatedRight,
      operator: updatedOperator,
      result: updatedResult
    });
  }

  const updateDisplay = (): void => {
    let displayResult = '';
    let { left, right, operator, result } = calculatorState;

    if (result != '' && (result != left)) {
      displayResult = result;
    } else if (right != '') {
      displayResult = right;
    } else if (operator != '') {
      displayResult = operator;
    } else if (left != '' && operator == '' && right == '' && result == '') {
      displayResult = left;
    } 
    setDisplay(displayResult);
  }

  useEffect(() => {
    updateDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatorState]);

  return (
    <div className={styles.gridContainer}>
      <div className={`${styles.displayDiv}`}>{display}</div>
      <div className={`${styles.btn} ${styles.clearBtn}`} onClick={() => updateExpression('C')}><span>C</span></div>
      <div className={`${styles.btn} ${styles.operatorBtn}`} onClick={() => updateExpression('/')}><span>÷</span></div>
      <div className={`${styles.btn}`} onClick={() => updateExpression('7')}><span>7</span></div>
      <div className={`${styles.btn}`} onClick={() => updateExpression('8')}><span>8</span></div>
      <div className={`${styles.btn}`} onClick={() => updateExpression('9')}><span>9</span></div>
      <div className={`${styles.btn} ${styles.operatorBtn}`} onClick={() => updateExpression('*')}><span>*</span></div>
      <div className={`${styles.btn}`} onClick={() => updateExpression('4')}><span>4</span></div>
      <div className={`${styles.btn}`} onClick={() => updateExpression('5')}><span>5</span></div>
      <div className={`${styles.btn}`} onClick={() => updateExpression('6')}><span>6</span></div>
      <div className={`${styles.btn} ${styles.operatorBtn}`} onClick={() => updateExpression('-')}><span>-</span></div>
      <div className={`${styles.btn}`} onClick={() => updateExpression('1')}><span>1</span></div>
      <div className={`${styles.btn}`} onClick={() => updateExpression('2')}><span>2</span></div>
      <div className={`${styles.btn}`} onClick={() => updateExpression('3')}><span>3</span></div>
      <div className={`${styles.btn} ${styles.operatorBtn}`} onClick={() => updateExpression('+')}><span>+</span></div>
      <div className={`${styles.btn} ${styles.zeroBtn}`} onClick={() => updateExpression('0')}><span>0</span></div>
      <div className={`${styles.btn}`} onClick={() => updateExpression('.')}><span>.</span></div>
      <div className={`${styles.btn} ${styles.operatorBtn}`} onClick={() => updateExpression('=')}><span>=</span></div>
    </div>
  )
}