import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

const { width } = Dimensions.get('window');
const CELL_WIDTH = width / 5 - 5; // Каждая ячейка занимает четверть экрана
const CELL_HEIGHT = 60; // Задаём фиксированную высоту для всех ячеек

export const Theory: React.FC = () => {
  const headers = [
    '',
    'МУЖСКОЙ DER (EIN) MANN',
    'СРЕДНИЙ DAS (EIN) KIND',
    'ЖЕНСКИЙ DIE (EINE) FRAU',
    'МНОЖ. ЧИСЛО DIE LEUTE',
  ];
  const rows = [
    ['Nominativ – wer? was? (кто? что?)', 'Der (ein)', 'Das (ein)', 'Die (eine)', 'Die'],
    ['Akkusativ – wen? was? (кого? что?)', 'Den (einen)', 'Das (ein)', 'Die (eine)', 'Die'],
    ['Dativ – wem? (кому? чему?)', 'Dem (einem)', 'Dem (einem)', 'Der (einer)', 'Den (-n)'],
  ];

  return (
    <View style={styles.tableContainer}>
      {/* Header Row */}
      <View style={[styles.row, styles.headerRow]}>
        {headers.map((header, index) => (
          <View style={styles.cell} key={index}>
            <AutoSizeText
              style={styles.cellHeader}
              numberOfLines={2}
              mode={ResizeTextMode.min_font_size}
              minFontSize={10}
              fontSize={14}
            >
              {header}
            </AutoSizeText>
          </View>
        ))}
      </View>

      {/* Data Rows */}
      {rows.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <View style={styles.cell} key={cellIndex}>
              <AutoSizeText
                style={styles.cellText}
                numberOfLines={2}
                mode={ResizeTextMode.min_font_size}
                minFontSize={8}
                fontSize={12}
              >
                {cell}
              </AutoSizeText>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  cell: {
    width: CELL_WIDTH, // Фиксированная ширина для всех ячеек
    height: CELL_HEIGHT, // Фиксированная высота для всех ячеек
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cellText: {
    textAlign: 'center',
  },
});
